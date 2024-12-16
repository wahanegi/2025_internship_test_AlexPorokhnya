# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000", "http://127.0.0.1:3000", "https://internship-project-alexporokhn-e1b689cea907.herokuapp.com"

    resource "*",
             headers: :any,
             expose: ["auth_token"],
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             credentials: true
  end
end