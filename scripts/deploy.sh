#!/usr/bin/env

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

now "$DIR/.." \
    -e APP_KEY=@app_key \
    -e DATABASE_URL=@database_url \
    -e DB_CONNECTION=@db_connection \
    -e GOOGLE_MAPS_KEY=@google_maps_key \
    -e DATABASE_SSL=@database_ssl "$@"
