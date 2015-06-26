class PicturesController < ApplicationController
   
    

   

	def destroy
		@photo = Picture.find(params[:id])
			
		if @photo.destroy

		  redirect_to albums_path	
		  
	     end
    end

        
end