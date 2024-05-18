#!/bin/bash

# RUN THIS SCRIPT FROM THE PROJECT ROOT DIRECTORY.

if [ -f scripts/.env ]; then
  source scripts/.env
else 
  echo "ERROR: .env file must exist in the ./scripts/ directory. Aborting script."
  echo "(make sure you run this script from the project root)"
  exit 1
fi

logdir="$(pwd)/scripts/logs/deploy-frontend-uat"
mkdir -p "$logdir"

datetime=$(date +"%Y-%m-%dT%H.%M.%S-%Z")
logfile="$logdir/$datetime.log"

echo "saving logs to $logfile..."

cd frontend/

echo "starting react build..." >> $logfile

npm run build:uat >> $logfile

echo "deploying static files to S3..." >> $logfile

aws s3 sync ./build/ $UAT_S3_BUCKET_URI \
--profile $AWS_PROFILE \
>> $logfile

echo "refreshing CloudFront cache..." >> $logfile

aws cloudfront create-invalidation \
--distribution-id $UAT_CLOUDFRONT_DISTRIBUTION_ID \
--paths "/*" \
--profile nickesqueda3@gmail.com \
>> $logfile

cd ..

echo 'script completed. some AWS processes may still be running.' >> $logfile
