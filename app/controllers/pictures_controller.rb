class PicturesController < ApplicationController
   

def index
  
    query = params[:name]

	@photo= Tag.where("name ilike ?","%#{query}%")

end
   
 


    def destroy
		@photo = Picture.find(params[:id])
			
		if @photo.destroy

		  redirect_to albums_path	
		  else
	 
    	end
end

	        
end