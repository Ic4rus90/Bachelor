import time
import requests

# Class to fetch and cache JWKS keys
class JWKSClient:
    def __init__(self, jwks_url):
        self.jwks_url = jwks_url
        self.jwks_cache = None
        self.cache_time = None
        self.cache_ttl = 600  # Cache TTL in seconds

    def get_jwks_keys(self):
        # Check if cache is valid
        if self.jwks_cache and self.cache_time and (time.time() - self.cache_time) < self.cache_ttl:
            return self.jwks_cache
        else:
            # Fetch new keys and update cache
            self.jwks_cache = requests.get(self.jwks_url).json()
            self.cache_time = time.time()
            return self.jwks_cache
