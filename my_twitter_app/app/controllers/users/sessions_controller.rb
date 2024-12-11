# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  skip_before_action :verify_authenticity_token, only: [:create]
  include ActionController::Cookies

  before_action :set_jwt_cookies, only: :create

  def create
    super do |response|
      render json: {
        message: "User logged in successfully",
        user: {
          id: response.id,
          email: response.email,
        }
      },status: :ok and return
    end
  end

  private

  def set_jwt_cookies
    return unless current_user

    token = Warden::JWTAuth::UserEncoder.new.call(
      current_user, :user, nil
    ).first

    Rails.logger.info "JWT: Token #{token}"
    Rails.logger.info "SECRET_KEY_BASE: #{Rails.application.secrets.secret_key_base}"
    cookies.encrypted[:auth_token] = {
      value: token,
      same_site: :strict,
      secure: Rails.env.production?,
      httponly: true,
      expires: 1.hour.from_now
    }

    Rails.logger.info "JWT: Token encrypted: #{cookies.encrypted[:auth_token]}"
  end
end
