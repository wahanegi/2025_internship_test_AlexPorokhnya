require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:valid_user) {create(:user)}
  let!(:token) do
    JWT.encode({ sub: valid_user.id }, Rails.application.secrets.secret_key_base)
  end

  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  context "POST #create" do
    context "with valid params" do
      it "successfully signed in" do
        request.cookies[:auth_token] = token

        post :create, params: {user: {email: valid_user.email, password: valid_user.password}}, format: :json
        expect(response).to have_http_status(:ok)
      end
    end
  end
end