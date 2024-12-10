class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true, length: { maximum: 225 }

  belongs_to :user
end
