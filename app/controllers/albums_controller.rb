class AlbumsController < ApplicationController

  def index
  
     @album= Album.all
  end

 def new
    @album= Album.new
    @photo= @album.pictures.new
    @tag = @photo.tags.new
   3.times do  
        @album.pictures.build
        

  end
 end

 def create

   @album=Album.create(album_params)

   if @album.save
    flash[:notice]="Successfully created album"
    redirect_to @album
   else
     render :action=> 'new'
  end
end
   
   def edit
    
  @album = Album.find(params[:id])
  end

    def show 
         @album=Album.find(params[:id])
    end

    def update
         @album=Album.find(params[:id])
               if @album.update(album_params)
                 redirect_to album_path(@album)
               else 
                   render 'edit'
                end
         end

  def destroy
    
    @album = Album.find(params[:id])
    @album.destroy

    redirect_to albums_path
  end
 private
             def album_params
               params.require(:album).permit(:Name,:Description,
       pictures_attributes: [:photo,tags_attributes: [:name]])
      end

end
