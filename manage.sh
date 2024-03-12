#!/bin/bash

# Function to start a service
start_service() {
    docker compose -f "$1" up -d
}

# Function to stop a service
stop_service() {
    docker compose -f "$1" down
}

# Function to build a service
build_service() {
    docker compose -f "$1" up -d --build
}

# Function to restart a service
restart_service() {
    stop_service "$1"
    start_service "$1"
}

# Prompt the user for action
read -p "Do you want to start, stop, build, or restart a service? " action

# Prompt the user for service(s)
read -p "Which service(s) do you want to perform the action on? ('all', 'code-val', 'llm', 'rep-gen', 'web-app', 'prefect', 'token-val' ) " services

# Perform the action based on user input
case "$action" in
    start)
        if [[ "$services" == "all" ]]; then
            start_service "services/code-validator/docker-compose.yml"
            start_service "services/codellama/docker-compose.yml"
            start_service "services/report-generator/docker-compose.yml"
            start_service "services/web-app/docker-compose.yml"
            start_service "services/prefect/docker-compose.yml"
            start_service "services/token-validator/docker-compose.yml"
        else
            for service in $services; do
                case "$service" in
                    code-val)
                        start_service "services/code-validator/docker-compose.yml"
                        ;;
                    llm)
                        start_service "services/codellama/docker-compose.yml"
                        ;;
                    rep-gen)
                        start_service "services/report-generator/docker-compose.yml"
                        ;;
                    web-app)
                        start_service "services/web-app/docker-compose.yml"
                        ;;
                    prefect)
                        start_service "services/prefect/docker-compose.yml"
                        ;;
                    token-val)
                        start_service "services/token-validator/docker-compose.yml"
                        ;;
                    *)
                        echo "Invalid service: $service"
                        ;;
                esac
            done
        fi
        ;;
    stop)
        if [[ "$services" == "all" ]]; then
            stop_service "services/code-validator/docker-compose.yml"
            stop_service "services/codellama/docker-compose.yml"
            stop_service "services/report-generator/docker-compose.yml"
            stop_service "services/web-app/docker-compose.yml"
            stop_service "services/prefect/docker-compose.yml"
            stop_service "services/token-validator/docker-compose.yml"
        else
            for service in $services; do
                case "$service" in
                    code-val)
                        stop_service "services/code-validator/docker-compose.yml"
                        ;;
                    llm)
                        stop_service "services/codellama/docker-compose.yml"
                        ;;
                    rep-gen)
                        stop_service "services/report-generator/docker-compose.yml"
                        ;;
                    web-app)
                        stop_service "services/web-app/docker-compose.yml"
                        ;;
                    prefect)
                        stop_service "services/prefect/docker-compose.yml"
                        ;;
                    token-val)
                        stop_service "services/token-validator/docker-compose.yml"
                        ;;
                    *)
                        echo "Invalid service: $service"
                        ;;
                esac
            done
        fi
        ;;
    build)
        if [[ "$services" == "all" ]]; then
            build_service "services/code-validator/docker-compose.yml"
            build_service "services/codellama/docker-compose.yml"
            build_service "services/report-generator/docker-compose.yml"
            build_service "services/web-app/docker-compose.yml"
            build_service "services/prefect/docker-compose.yml"
            build_service "services/token-validator/docker-compose.yml"
        else
            for service in $services; do
                case "$service" in
                    code-val)
                        build_service "services/code-validator/docker-compose.yml"
                        ;;
                    llm)
                        build_service "services/codellama/docker-compose.yml"
                        ;;
                    rep-gen)
                        build_service "services/report-generator/docker-compose.yml"
                        ;;
                    web-app)
                        build_service "services/web-app/docker-compose.yml"
                        ;;
                    prefect)
                        build_service "services/prefect/docker-compose.yml"
                        ;;
                    token-val)
                        build_service "services/token-validator/docker-compose.yml"
                        ;;
                    *)
                        echo "Invalid service: $service"
                        ;;
                esac
            done
        fi
        ;;
    restart)
        if [[ "$services" == "all" ]]; then
            restart_service "services/code-validator/docker-compose.yml"
            restart_service "services/codellama/docker-compose.yml"
            restart_service "services/report-generator/docker-compose.yml"
            restart_service "services/web-app/docker-compose.yml"
            restart_service "services/prefect/docker-compose.yml"
            restart_service "services/token-validator/docker-compose.yml"
        else
            for service in $services; do
                case "$service" in
                    code-val)
                        restart_service "services/code-validator/docker-compose.yml"
                        ;;
                    llm)
                        restart_service "services/codellama/docker-compose.yml"
                        ;;
                    rep-gen)
                        restart_service "services/report-generator/docker-compose.yml"
                        ;;
                    web-app)
                        restart_service "services/web-app/docker-compose.yml"
                        ;;
                    prefect)
                        restart_service "services/prefect/docker-compose.yml"
                        ;;
                    token-val)
                        restart_service "services/token-validator/docker-compose.yml"
                        ;;
                    *)
                        echo "Invalid service: $service"
                        ;;
                esac
            done
        fi
        ;;
    *)
        echo "Invalid action: $action"
        ;;
esac
