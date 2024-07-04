# API Examples

Example scripts interacting with Ethena Minting API

# Quick start for minting

## Prepare .env file

```
$ cp .env.example .env
# Edit .env file with your credentials. These will be loaded into environment variables on start.
```

## Install Python

Tested under Python 3.11.

```
# Create self-contained Python environment:
$ python -m venv myenv
# Activate the environment:
$ source venv/bin/activate
# Check version = 3.11
(venv) $ python3 --version
# Install requirements
(venv) $ pip install -r requirements.txt
```

## Run mint

```
$ This will run the mint.
$ ./mint_script_v2.py
```

# FAQ

* Q. What is [mint_script.py](mint_script.py)?
* A. The original mint script which is now obsolete. Use [mint_script_v2.py](mint_script_v2.py) instead.

# Changes in V2

- `rfq_id` returned in the `/rfq` endpoint must now be included as `order_id` within the signed order payload posted to the `/order` endpoint.
- `rfq_id` is no longer required with the `/order` submission parameters.
- `signature_type` has been included as optional parameter in the `/order` endpoint.  The default value is `EIP712` with the only other supported value being `EIP1271`; mandatory for orders of that kind.