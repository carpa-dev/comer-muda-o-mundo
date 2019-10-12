#!/usr/bin/env bash

set -euo pipefail

helm upgrade -i cmom-db stable/postgresql \
	--set postgresqlUsername=cmom \
	--set postgresqlPassword=dev \
	--set postgresqlDatabase=cmom \
	--namespace cmom


echo "Port-forwarding db to port 5432"
until [ "$(kubectl port-forward --namespace cmom svc/cmom-db-postgresql 5432:5432)" ]; do 
	echo "DB not ready yet";
	sleep 5s;
done
