class Member < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[google_oauth2]
  
  # has
  has_many :food_records
  has_many :sport_records
  has_many :statistics
  has_one  :membersecret
  has_one_attached :cover_image

  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
                                  
  has_many :following, through: :active_relationships, source: :followed

  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy

  has_many :followers, through: :passive_relationships, source: :follower

  # Follows a user.
  def follow(other_member)
    following << other_member
  end

  # Unfollows a user.
  def unfollow(other_member)
    following.delete(other_member)
  end

  # Returns true if the current user is following the other user.
  def following?(other_member)
    following.include?(other_member)
  end

  def employee?
    role.in? ['staff', 'boss', 'admin']
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |member|
      member.email = auth.info.email
      member.password = Devise.friendly_token[0, 20]
      member.name = auth.info.name   # assuming the member model has a name
      member.avatar = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end
end
