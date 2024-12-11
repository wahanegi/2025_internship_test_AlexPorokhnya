require 'rails_helper'

# frozen_string_literal: true
require 'rails_helper'
RSpec.describe Post, type: :request do
  before do
    user = User.create(email: "test1@gmail.com", password: "password")
    confirmation_token = user.confirmation_token
    Rails.logger.info(confirmation_token)
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: confirmation_token}
    Rails.logger.info("User id: #{user.id}")
    Rails.logger.info("User confirmed at: #{user.confirmed_at}")
    Post.create(title: "First Post", body: "First Body", user_id: user.id)
    Post.create(title: "Second Post", body: "Second Body",  user_id: user.id)
    Post.create(title: "Third Post", body: "Third Body", user_id: user.id)
  end

  it "#index" do
    get "http://127.0.0.1:3000/api/v1/posts"
    expect(response).to have_http_status(:ok)
    posts = JSON.parse(response.body)
    expect(posts.length).to eq(3)
  end
end

RSpec.describe "PostsController", type: :request do
  let(:valid_post) {{title: "First Post", body: "First Body"}}

  before do
    user = User.create(email: "test1@gmail.com", password: "password")
    confirmation_token = user.confirmation_token
    Rails.logger.info("Confirmation token: #{confirmation_token}")
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: confirmation_token}
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test1@gmail.com", password: "password"}}
  end

  it "#create with correct data" do
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(:ok)
  end

  it "#create with blank title" do
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["title"]).to eq(["can't be blank"])
  end

  it "#create with blank body" do
    valid_post[:body] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["body"]).to eq(["can't be blank"])
  end
  it "#create blank" do
    valid_post[:body] = nil
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["data"]["body"]).to eq(["can't be blank"])
    expect(body["data"]["title"]).to eq(["can't be blank"])
  end
end

RSpec.describe "ApplicationController", type: :request do
  it "#current return signed in current user" do
    user = User.create(email: "test1@gmail.com", password: "password")
    confirmation_token = user.confirmation_token
    Rails.logger.info("Confirmation token: #{confirmation_token}")
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: confirmation_token}
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test1@gmail.com", password: "password"}}
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(:ok)
    body = JSON.parse(response.body)
    expect(body["email"]).to eq("test1@gmail.com")
  end
  it "#current unauthorized" do
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(401)
  end
  it "#current email unconformable" do
    User.create(email: "test1@gmail.com", password: "password")
    post "http://localhost:3000/users/sign_in", params: {user: {email: "test1@gmail.com", password: "password"}}
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(401)
  end
end

RSpec.describe "RegistrationController", type: :request do
  before do
    user = User.create(email: "test1@gmail.com", password: "password")
    confirmation_token = user.confirmation_token
    Rails.logger.info(confirmation_token)
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: confirmation_token}
  end
  it "success registration" do
    post "http://localhost:3000/users", params: {user: {email: "test90@gmail.com", password: "123456"}}
    expect(response).to have_http_status(201)
  end

  it "user already exist" do
    post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com", password: "password"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["has already been taken"])
  end

  it "email blank" do
    post "http://localhost:3000/users/", params: {user: {password: "123456"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["can't be blank"])
  end

  it "password blank and existing email" do
    post "http://localhost:3000/users/", params: {user: {email: "test1@gmail.com"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["email"]).to eq(["has already been taken"])
    expect(body["errors"]["password"]).to eq(["can't be blank"])
  end

  it "password blank" do
    post "http://localhost:3000/users/", params: {user: {email: "test5@gmail.com"}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["password"]).to eq(["can't be blank"])
  end

  it "all fields blank" do
    post "http://localhost:3000/users/", params: {user: {}}
    expect(response).to have_http_status(422)
    body = JSON.parse(response.body)
    expect(body["errors"]["password"]).to eq(["can't be blank"])
    expect(body["errors"]["email"]).to eq(["can't be blank"])
  end
end

