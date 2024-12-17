require 'rails_helper'

# frozen_string_literal: true

RSpec.describe Post, type: :model do
  it {should belong_to(:user)}
  it {should validate_presence_of(:title)}
  it {should validate_presence_of(:body)}
  it {should validate_length_of(:body).is_at_most(255)}
end

