class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all.with_attached_cover_image
  end

  def show
    @following = Member.find(params[:id]).following
    @followers = Member.find(params[:id]).followers

    @member = Member.all.find(params[:id])
    @food = FoodRecord.where(member_id: @member.id)
    @calories = []
    @food.each do |f|
      @calories << f['calories']
    end

    @sport = SportRecord.where(member_id: @member.id)
    @sprot_calories = []
    @sport.each do |s|
      @sprot_calories << s['totalconsum']
    end
  end

  def new
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
