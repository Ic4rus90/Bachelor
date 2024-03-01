import jwt
import requests
import os
from cryptography.x509 import load_pem_x509_certificate
from jwt.algorithms import RSAAlgorithm
from loguru import logger

AUTH0_DOMAIN = 'security-seal.eu.auth0.com'

# Sets up loguru to log to a file under token-validator/logs
def set_up_logger() -> None:
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "token-validator.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)


def verify_token_with_auth0(token: str) -> bool:
    # Get the JWKS keys
    jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
    jwks = requests.get(jwks_url).json()

    # Extract the user token's header
    unverified_header = jwt.get_unverified_header(token)

    # Find the key in the JWKS that matches the token KID
    rsa_key = {}
    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    
    # Verify the token using the RSA key
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                RSAAlgorithm.from_jwk(rsa_key),
                algorithms=['RS256'],
                issuer=f'https://{AUTH0_DOMAIN}/'
            )
            print("Token is valid.")
            return True  # Token is valid
        except jwt.ExpiredSignatureError:
            logger.error("Token has expired.")
            print("Token has expired.")
        except jwt.DecodeError as e:
            logger.error(f"Token could not be decoded: {e}")
            print(f"Token could not be decoded: {e}")
        except jwt.InvalidAudienceError as e:
            logger.error(f"Token has invalid audience: {e}")
            print(f"Token has invalid audience: {e}")
        except jwt.InvalidTokenError as e:
            logger.error(f"Token is invalid: {e}")
            print(f"Token is invalid: {e}")
        except Exception as e:
            logger.error(f"An error occurred: {e}")
            print(f"An error occurred: {e}")
    
    return False  # Token is invalid

set_up_logger()
