class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @members = current_member
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

