import os

def traceroute(ip_address):
    result = os.popen("traceroute " + ip_address).read()
    return result
