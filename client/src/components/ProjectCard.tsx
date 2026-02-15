import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import type React from "react";
import type { Project } from "../types";
import { EllipsisIcon, ImageIcon, Loader2Icon, PlaySquareIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { GhostButton, PrimaryButton } from "./Buttons";

interface ProjectCardProps {
  gen: Project;
  setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommunity?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  gen,
  setGenerations,
  forCommunity = false,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDelete = async(id:string)=>{
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return; 
      console.log(id)
  }

 const togglePublish = async(projectId:string)=>{
      console.log(projectId)
  }




  const aspectClass = useMemo(
    () => (gen.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"),
    [gen.aspectRatio],
  );

  const createdAt = useMemo(
    () => new Date(gen.createdAt).toLocaleString(),
    [gen.createdAt],
  );

  const updatedAt = useMemo(
    () => gen.updatedAt && new Date(gen.updatedAt).toLocaleDateString(),
    [gen.updatedAt],
  );

  const hasMedia = gen.generatedImage || gen.generatedVideo;

  return (
    <div className="mb-4 break-inside-avoid">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">
        {/* Preview */}
        <div className={`${aspectClass} relative overflow-hidden`}>
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
                gen.generatedVideo
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-105"
              }`}
            />
          )}

          {gen.generatedVideo && (
            <video
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )}

          {!hasMedia && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2Icon className="size-7 animate-spin" />
            </div>
          )}

          {/* Status Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {gen.isGenerating && (
              <span className="text-xs px-2 py-1 rounded bg-yellow-600/30">
                Generating
              </span>
            )}
            {gen.isPublished && (
              <span className="text-xs px-2 py-1 rounded bg-green-600/30">
                Published
              </span>
            )}
          </div>


{/* Action menu (my generations only) */}
{!forCommunity && (
  <div className="absolute right-3 top-3 z-20">
    {/* Trigger */}
    <button
      type="button"
      aria-label="Project actions"
      onClick={() => setMenuOpen((v) => !v)}
      className="bg-black/30 hover:bg-black/50 rounded-full p-1 
                 opacity-100 sm:opacity-0 group-hover:opacity-100 transition"
    >
      <EllipsisIcon className="size-5 text-white" />
    </button>

    {/* Dropdown */}
    {menuOpen && (
      <ul
        className="absolute right-0 mt-2 w-40 text-xs
                   bg-black/60 backdrop-blur-md text-white
                   border border-white/10 rounded-lg shadow-lg
                   overflow-hidden"
      >


       

        {gen.generatedImage && (
          <li>
            <a
              href={gen.generatedImage}
              download
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
            >
              <ImageIcon size={14} />
              Download Image
            </a>
          </li>
        )}

        {gen.generatedVideo && (
          <li>
            <a
              href={gen.generatedVideo}
              download
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
            >
              <PlaySquareIcon size={14} />
              Download Video
            </a>
          </li>
        )}

 <li>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleDelete(gen.id);
            }}
            className="w-full flex gap-2 items-center px-4 py-2
                       text-red-400 hover:bg-red-900/10"
          >
            <Trash2Icon size={14} />
            Delete
          </button>
        </li>



        {(gen.generatedVideo || gen.generatedImage) && (
           <li>


    <button
  type="button"
  className="w-full flex gap-2 items-center px-4 py-2 hover:bg-white/10"
  onClick={async () => {
    setMenuOpen(false);

    const url = gen.generatedVideo || gen.generatedImage;
    if (!url) return;

    if (navigator.share) {
      await navigator.share({
        title: gen.productName,
        text: gen.productDescription,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  }}
>
  <Share2Icon size={14} />
  Share
</button>



  </li>
        )}
      </ul>
    )}
  </div>
)}






          {/* Source Images */}
          {gen.uploadedImages?.length > 0 && (
            <div className="absolute right-3 bottom-3 flex">
              {gen.uploadedImages.slice(0, 2).map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`source-${index}`}
                  className={`w-14 h-14 object-cover rounded-full animate-float ${
                    index === 1 ? "-ml-6" : ""
                  }`}
                  style={{ animationDelay: `${index * 3}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex justify-between gap-4">
            <div>
              <h3 className="font-medium text-lg mb-1">{gen.productName}</h3>
              <p className="text-sm text-gray-400">Created: {createdAt}</p>
              {updatedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Updated: {updatedAt}
                </p>
              )}
            </div>

            <span className="text-xs px-2 py-1 h-fit bg-white/5 rounded-full">
              Aspect: {gen.aspectRatio}
            </span>
          </div>
          {/* product description */}
          {gen.productDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <div
                className="text-xs text-gray-300 bg-white/5 p-2 rounded-md 
                      wrap-break-word whitespace-pre-line leading-relaxed
                      max-h-24 overflow-auto scrollbar-thin scrollbar-thumb-white/10"
              >
                {gen.productDescription}
              </div>
            </div>
          )}

          {/* user prompt */}
          {gen.userPrompt && (
            <div className="mt-3">
              <div
                className="text-sm text-gray-300 bg-white/5 p-2 rounded-md 
                      wrap-break-word whitespace-pre-line leading-relaxed
                      max-h-24 overflow-auto scrollbar-thin scrollbar-thumb-white/10"
              >
                {gen.userPrompt}
              </div>
            </div>
          )}
        
           {/* button */}
           {!forCommunity && (
            <div className="mt-4 grid-cols-2 gap-3">
              <GhostButton className="text-xs justify-center" onClick={()=> {navigate(`/result/${gen.id}`); scrollTo(0,0)}}>
                  View Details
              </GhostButton>
              <PrimaryButton onClick={()=> togglePublish(gen.id)} className="rounded-md">
                {gen.isPublished? 'unpublish' : 'publish'}
              </PrimaryButton>
            </div>
           )}


        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
