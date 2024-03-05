import jwt
from jwt.algorithms import RSAAlgorithm
from config import AUTH0_DOMAIN, AUTH0_AUDIENCE
from logger import logger
from models import GenerateRequest


def verify_token(request, jwks_client) -> bool:
    # Fetch JWKS keys
    jwks = jwks_client.get_jwks_keys()

    token = request.token
    # Extract the user token's header
    try:
        unverified_header = jwt.get_unverified_header(token)
    except jwt.DecodeError as e:
        logger.error(f"Error getting unverified header: {e}")
        return False
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return False

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
                audience=AUTH0_AUDIENCE,
                issuer=f'https://{AUTH0_DOMAIN}/'
            )
            logger.info("Token is valid.")
            return True  # Token is valid
        except jwt.ExpiredSignatureError:
            logger.error("Token has expired.")
        except jwt.DecodeError as e:
            logger.error(f"Token could not be decoded: {e}")
        except jwt.InvalidAudienceError as e:
            logger.error(f"Token has invalid audience: {e}")
        except jwt.InvalidTokenError as e:
            logger.error(f"Token is invalid: {e}")
        except Exception as e:
            logger.error(f"An error occurred: {e}")
    
    return False  # Token is invalid