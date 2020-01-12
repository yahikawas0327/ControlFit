class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    start_time = Time.zone.now.beginning_of_day
    end_time = Time.zone.now.end_of_day

    @following = current_member.following
    @followers = current_member.followers
    @foods_today = FoodRecord.where(member_id: current_member.id).where('created_at BETWEEN ? AND ?', start_time, end_time)
    @calories = []
    @foods_today.each do |f|
      @calories << f['calories']
    end

    @sport = SportRecord.where(member_id: current_member.id).where('created_at BETWEEN ? AND ?', start_time, end_time)
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

