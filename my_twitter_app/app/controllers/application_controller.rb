class ApplicationController < ActionController::Base

  include ActionController::Cookies

  def current
    token = cookies.encrypted[:auth_token]

    Rails.logger.info "Token: #{token}"
    Rails.logger.info "SECRET_KEY_BASE: #{Rails.application.secrets.secret_key_base}"
    if token.blank?
      render json: {error: "Unauthorized, token is blank" }, status: 401
      return
    end

    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
      Rails.logger.info "Payload: #{payload}"
      @current_user = User.find(payload["sub"])
      render json: @current_user, status: :ok
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: {error: "Unauthorized, errors" }, status: 401
    end
  end
end
