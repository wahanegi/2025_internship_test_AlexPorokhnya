require 'rails_helper'

RSpec.describe "ApplicationController", type: :request do
  let(:user) {create(:user)}

  it "#current return signed in current user" do
    get "http://localhost:3000/users/confirmation", params: {confirmation_token: user.confirmation_token}
    post "http://localhost:3000/users/sign_in", params: {user: {email: user.email, password: user.password}}
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(:ok)
  end

  it "#current unauthorized" do
    get "http://localhost:3000/current_user"
    expect(response).to have_http_status(401)
  end
end