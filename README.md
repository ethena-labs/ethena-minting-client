# API Examples

Example scripts interacting with Ethena API

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
$ python -m venv env
# Activate the environment:
$ source venv/bin/activate
# Check version = 3.11
(venv) $ python3 --version
# Install requirements
(venv) $ pip install -r requirements.txt
```

## Run mint

```
$ ./mint_script_v2.py
```

# FAQ

* Q. What is [mint_script.py](mint_script.py)?
* A. The original mint script which is now obsolete. Use [mint_script_v2.py](mint_script_v2.py) instead.