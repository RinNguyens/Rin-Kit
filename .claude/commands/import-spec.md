---
description: Import an OpenAPI / JSON Schema / Protobuf file and convert it to a Rin spec
---

1. Ask the user for the path to the schema file (OpenAPI YAML/JSON, JSON Schema, or `.proto`).
2. Read the file.
3. Detect the format and parse accordingly:
   - **OpenAPI**: extract paths, request bodies, response schemas, error codes
   - **JSON Schema**: extract fields, types, required, description, enum values
   - **Protobuf**: extract message fields, RPC methods, return types

4. Convert to Rin spec format:
   - Inputs → request fields / message fields
   - Outputs → response fields
   - Behavior → one rule per RPC method or endpoint
   - Error Cases → HTTP error codes or gRPC status codes

5. Write to `specs/<name>.md` with `Status: imported`.
6. Flag anything that couldn't be converted as `[manual review needed]`.
7. Recommend running `/spec-lint` before planning.
