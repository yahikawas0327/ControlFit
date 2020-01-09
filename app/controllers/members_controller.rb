class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @following = current_member.following
    @followers = current_member.followers
    @food = FoodRecord.where(member_id: current_member.id)
    @calories = []
    @food.each do |f|
      @calories << f['calories']
    end
  end

  def following
    @members = Member.find(params[:id]).following
  end

  def followers
    @members = Member.find(params[:id]).followers
  end
end

