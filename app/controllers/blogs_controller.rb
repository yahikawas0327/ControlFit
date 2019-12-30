class BlogsController < ApplicationController
  def index
    # @blogs = Blog.all
  end

  def new
    # @blog = Blog.new
  end

  def create
       user_height = (params[:Height]).to_i
       user_weight = (params[:Weight]).to_i
       user_gender = params[:Gender]
       user_age = (params[:Age]).to_i

       user_bmi = bmiformula(user_height, user_weight)
      #  puts "bmi ok"
       user_bmi_range = bmirange(user_bmi)
      #  puts user_bmi_range
       user_ree = ree_formula(user_weight,user_height,user_gender,user_age)
      #  puts "ree_ok"
       user_bmr = bmr_formula(user_weight,user_height,user_age,user_gender)
      #  puts "bmr_ok"

       physical_hash = { bmi: user_bmi,
                         bmi_range: user_bmi_range,
                         ree: user_ree,
                         bmr: user_bmr}
       render json: physical_hash
  end
 
  private
  
  def bmiformula(height, weight)
      height_meter =height/100.0
      bmi = (weight/(height_meter**2)).round(1) 
  end
  def bmirange(bmi)
    # bmi_integer=bmi.to_f
    bmi_integer=bmi
    if bmi_integer < 18.5 
      return '體重過輕'
    elsif bmi_integer >= 18.5 && bmi_integer <24
      return '健康體位'
    elsif bmi_integer >= 24 && bmi_integer < 27
      return '過重'
    elsif bmi_integer >= 27 && bmi_integer < 30
      return '輕度肥胖'
    elsif bmi_integer >= 30 && bmi_integer < 35
      return '中度肥胖'
    else
      return '重度肥胖'
    end
  end
  def ree_formula(weight,height,gender,age)
    case gender
    when gender ='Man'
        i=-161
    when gender ='Woman'
        i=5
    else
    end 
    ree= (10*weight)+(6.25*height)-(5*age)+i;
  end
  def bmr_formula(weight,height,age,gender)
    case gender
    when gender ='Man'
        bmr = ((13.7*weight)+(5*height)-(6.8*age))+66
    when gender ='Woman'
        bmr = ((9.6*weight)+(1.8*height)-(4.7*age))+655
    else
    end
  end

end
