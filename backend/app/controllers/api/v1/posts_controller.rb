# frozen_string_literal: true

module Api
    module V1
      class PostsController < ApplicationController
        before_action :authenticate_user!, only: [:create]
        def index
          @posts = Post.all
          render json: @posts
        end

        def create
          @post = Post.new post_params

          if @post.save
            render json: {message: "Post successfully created", data: @post}
          else
            render json: {message: "Error creating post", data: @post.errors}, status: :unprocessable_entity
          end
        end

        private
        def post_params
          params.require(:post).permit(:title, :body)
        end

        def authenticate_user!
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
          rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
            render json: {error: "Unauthorized, errors" }, status: 401
          end
        end
      end
  end
end