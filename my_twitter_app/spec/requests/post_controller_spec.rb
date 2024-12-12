require 'rails_helper'
RSpec.describe "PostController", type: :request do
  let(:user) {create(:user)}
  before do
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: user.confirmation_token}
    create(:post, user: user)
    create(:post, user: user)
    create(:post, user: user)
  end

  it "#index" do
    get "http://127.0.0.1:3000/api/v1/posts"
    expect(response).to have_http_status(:ok)
    posts = JSON.parse(response.body)
    expect(posts.length).to eq(3)
  end
end

RSpec.describe "PostController", type: :request do
  let(:user) {create(:user)}
  let(:valid_post) {attributes_for(:post, user_id: user.id)}
  before do
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: user.confirmation_token}
    post "http://localhost:3000/users/sign_in", params: {user: {email: user.email, password: user.password}}
  end

  it "#create with correct data" do
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(:ok)
  end

  it "#create with blank title" do
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
  end

  it "#create with blank body" do
    valid_post[:body] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
  end
  it "#create blank" do
    valid_post[:body] = nil
    valid_post[:title] = nil
    post "http://localhost:3000/api/v1/posts", params: {post: valid_post}, headers: {"Set-Cookie" => "auth_token=#{cookies["auth_token"]}"}
    expect(response).to have_http_status(422)
  end
end