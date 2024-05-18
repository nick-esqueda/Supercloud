#!/bin/bash

# RUN THIS SCRIPT FROM THE PROJECT ROOT DIRECTORY.

if [ -f scripts/.env ]; then
  source scripts/.env
else 
  echo "ERROR: .env file must exist in the ./scripts/ directory. Aborting script."
  echo "(make sure you run this script from the project root)"
  exit 1
fi

logdir="$(pwd)/scripts/logs/stop-infra-uat"
mkdir -p "$logdir"

datetime=$(date +"%Y-%m-%dT%H.%M.%S-%Z")
logfile="$logdir/$datetime.log"

echo "saving logs to $logfile..."

cd backend/

echo 'triggering RDS DB shutdown...' >> $logfile

aws rds stop-db-instance \
--no-cli-pager \
--db-instance-identifier $UAT_RDS_DB_INSTANCE_ID \
--profile $AWS_PROFILE \
>> $logfile

echo 'removing load balancer from EB environment...' >> $logfile

cd .elasticbeanstalk
eb config supercloud-uat \
--update file://update-to-single-instance-env.yml \
--profile $AWS_PROFILE \
>> $logfile
cd ..

echo 'scaling EC2 instances down to 0...' >> $logfile

aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name $UAT_AUTO_SCALING_GROUP_NAME \
--min-size 0 \
--max-size 1 \
--desired-capacity 0 \
--profile $AWS_PROFILE \
>> $logfile

echo 'script completed. some AWS processes may still be running.' >> $logfile
