# My Express App

This project is an Express server that accepts a knowledge base in JSON format, generates a unique ID for it, stores it in a specified file path, and processes subsequent requests by querying OpenAI with the knowledge base.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-express-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

### Add Knowledge Base

- **Endpoint:** `POST /api/knowledge-base`
- **Description:** Accepts a JSON knowledge base and stores it with a unique ID.
- **Request Body:**
  ```json
  {
    "knowledgeBase": {
      "title": "Sample Knowledge Base",
      "content": "This is a sample content."
    }
  }
  ```

### Query Knowledge Base

- **Endpoint:** `GET /api/knowledge-base/:id`
- **Description:** Queries the knowledge base using the unique ID and returns a response from OpenAI.
- **Parameters:**
  - `id`: The unique ID of the knowledge base.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.