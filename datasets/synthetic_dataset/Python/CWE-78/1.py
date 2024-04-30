import os

def ping_host(hostname):
    response = os.system("ping -c 1 " + hostname)
    return response
