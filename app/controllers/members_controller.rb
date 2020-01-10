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

    @sport = SportRecord.where(member_id: current_member.id)
    @sprot_calories = []
    @sport.each do |s|
      @sprot_calories << s['totalconsum']
    end

    @membersecret = Membersecret.where(member_id: current_member.id)
    @bmr = []
    @membersecret.each do |m|
      @bmr << m['bmr']
    end
    @a = @bmr.sum - @calories.sum

  end

  def following
    @members = Member.find(params[:id]).following
  end

  def followers
    @members = Member.find(params[:id]).followers
  end
end

