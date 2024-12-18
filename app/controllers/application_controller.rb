class ApplicationController < ActionController::Base

  include ActionController::Cookies

  def current
    token = cookies.encrypted[:auth_token]
    if token.blank?
      render json: {error: "Unauthorized, token is blank" }, status: 401
      return
    end

    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
      @current_user = User.find(payload["sub"])
      if @current_user.confirmed_at.nil?
        render json: "Unconfirmed email", status: 401
      end
      render json: @current_user, status: :ok
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: {error: "Unauthorized, errors" }, status: 401
    end
  end
end
