cd backend/
pwd

echo "This script will shut down the PROD EB environment (DB, EC2 instances, ELB). Are you sure you want to proceed? (yes/no)"
read confirmation

if [ "$confirmation" == "yes" ]; then
    echo "Proceeding with the rest of the script..."
else
    echo "Script aborted."
    exit 1
fi

echo 'triggering RDS DB shutdown...'
aws rds stop-db-instance --no-cli-pager --db-instance-identifier awseb-e-jx2adpmpzb-stack-awsebrdsdatabase-0si2tmuytexo

echo 'killing load balancer...'
cd .elasticbeanstalk
eb config supercloud-prod --update file://update-to-single-instance-env.yml
cd ..

echo 'scaling down EC2 instances to 0...'
aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name awseb-e-jx2adpmpzb-stack-AWSEBAutoScalingGroup-Qu3swT789bps \
--min-size 0 \
--max-size 1 \
--desired-capacity 0

echo 'script completed. some AWS processes may still be running.'
