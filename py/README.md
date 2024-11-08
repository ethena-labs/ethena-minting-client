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
$ ./py/mint_script.py
```