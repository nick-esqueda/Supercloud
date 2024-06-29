#!/bin/bash

# THIS SCRIPT SHOULLD ONLY BE USED ON THE DEPLOYED EC2 INSTANCE

# Exit script if any command fails
set -e

# Load environment variables
HOME_DIR="/home/ec2-user"
export $(grep -v '^#' $HOME_DIR/.env | xargs)

# Variables
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
BACKUP_DIR="$HOME_DIR/db-backups"
BACKUP_NAME="$DB_DATABASE-$TIMESTAMP.sql"
TEMP_DIR="/tmp"

# Create the backup directory if it doesn't exist
sudo mkdir -p $BACKUP_DIR

# Run the pg_dump command inside the Docker container
echo 'starting database dump...'
sudo docker exec -i ec2-user-db-1 /usr/bin/pg_dump -U $DB_USERNAME $DB_DATABASE > $TEMP_DIR/$BACKUP_NAME
sudo mv $TEMP_DIR/$BACKUP_NAME $BACKUP_DIR/$BACKUP_NAME

# replace the original dump file with the new one by creating a symlink so that 
# docker can use it as a DB init script on next startup.
sudo mv $HOME_DIR/backup.sql $HOME_DIR/old-backup.sql
sudo ln -s $BACKUP_DIR/$BACKUP_NAME $HOME_DIR/backup.sql
sudo rm $HOME_DIR/old-backup.sql

# Upload the backup to S3
echo 'starting S3 upload...'
aws s3 cp $BACKUP_DIR/$BACKUP_NAME s3://$DB_BACKUP_S3_BUCKET/db-backup/$BACKUP_NAME

# Remove old backups locally
sudo find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
echo 'removed backups older than 7 days'
