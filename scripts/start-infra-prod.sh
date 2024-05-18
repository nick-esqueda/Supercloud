#!/bin/bash

# RUN THIS SCRIPT FROM THE PROJECT ROOT DIRECTORY.

if [ -f scripts/.env ]; then
  source scripts/.env
else 
  echo "ERROR: .env file must exist in the ./scripts/ directory. Aborting script."
  echo "(make sure you run this script from the project root)"
  exit 1
fi

logdir="$(pwd)/scripts/logs/start-infra-prod"
mkdir -p "$logdir"

datetime=$(date +"%Y-%m-%dT%H.%M.%S-%Z")
logfile="$logdir/$datetime.log"

echo "saving logs to $logfile..."

cd backend/

echo 'triggering RDS DB startup...' >> $logfile

aws rds start-db-instance \
--no-cli-pager \
--db-instance-identifier $RDS_DB_INSTANCE_ID_PROD \
--profile $AWS_PROFILE \
>> $logfile

echo 'enabling load balancer in EB environment...' >> $logfile

cd .elasticbeanstalk
eb config supercloud-prod \
--update file://update-to-load-balanced-env.yml \
--profile $AWS_PROFILE \
>> $logfile
cd ..

echo 'scaling EC2 instances up to 1...' >> $logfile

aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name $AUTO_SCALING_GROUP_NAME_PROD \
--min-size 1 \
--max-size 1 \
--desired-capacity 1 \
--profile $AWS_PROFILE \
>> $logfile

echo 'script completed. some AWS processes may still be running.' >> $logfile
