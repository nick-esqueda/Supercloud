cd backend/
pwd

echo 'triggering RDS DB startup...'
aws rds start-db-instance --no-cli-pager --db-instance-identifier awseb-e-utcpakumhy-stack-awsebrdsdatabase-ddpoqmzqipes

echo 'enabling load balancer...'
cd .elasticbeanstalk
eb config supercloud-uat --update file://update-to-load-balanced-env.yml
cd ..

echo 'scaling up EC2 instances to 1...'
aws autoscaling update-auto-scaling-group \
--auto-scaling-group-name awseb-e-utcpakumhy-stack-AWSEBAutoScalingGroup-SPdDlt2wm4Eu \
--min-size 1 \
--max-size 1 \
--desired-capacity 1

echo 'script completed. some AWS processes may still be running.'

