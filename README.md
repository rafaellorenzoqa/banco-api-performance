# Banco API Performance Tests

A [k6](https://k6.io/) performance test for the login endpoint of a banking REST API.

> **Note:** This is a mentorship practice project (Mentoria JL 2.0, by Julio de Lima). The API under test comes from the course, and the test is mine. It is a small, early-stage project.

## What it tests

`tests/login.test.js` sends `POST /login` with valid credentials to an API running locally (`http://localhost:3000`):

- **Load:** 50 iterations, with a 1-second pause after each request to simulate real usage.
- **Thresholds** (the performance part: the run fails if any of them is broken):
  - 90% of requests respond in under 10 ms, and the slowest one in under 1 ms.
  - Fewer than 1% of requests fail.
- **Checks** (functional sanity, not performance): the status is `200` and the response contains a token string.

## Run it

1. Start the banking API locally on port 3000.
2. [Install k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).
3. Run the test:

```
k6 run tests/login.test.js
```

## Known limitations

- Only the login endpoint is covered.
- The test uses a fixed number of iterations, with no ramp-up stages and no multiple virtual users.
- The thresholds are fixed example values. Tune them for a real environment.
