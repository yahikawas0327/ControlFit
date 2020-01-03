class Relationship < ApplicationRecord
  belongs_to :follower, class_name: "Member"
  belongs_to :followed, class_name: "Member"
  validates :follower_id, presence: true
  validates :followed_id, presence: true
  validate :not_following_himself

  def not_following_himself 
    errors.add :followed_id if followed_id == follower_id
  end
end
