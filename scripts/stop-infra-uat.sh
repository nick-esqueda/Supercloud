cd backend/
pwd

echo 'triggering RDS DB shutdown...'
aws rds stop-db-instance --no-cli-pager --db-instance-identifier awseb-e-utcpakumhy-stack-awsebrdsdatabase-ddpoqmzqipes

echo 'killing load balancer...'
cd .elasticbeanstalk
eb config supercloud-uat --update file://update-to-single-instance-env.yml
cd ..

echo 'scaling down EC2 instances to 0...'
aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name awseb-e-utcpakumhy-stack-AWSEBAutoScalingGroup-SPdDlt2wm4Eu \
--min-size 0 \
--max-size 1 \
--desired-capacity 0

echo 'script completed. some AWS processes may still be running.'

