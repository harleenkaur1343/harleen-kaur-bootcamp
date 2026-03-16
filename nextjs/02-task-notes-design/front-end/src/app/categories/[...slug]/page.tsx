export default async function TaskPage({params}:{params:Promise<{slug:string[]}>}){
  const param = await params;
  return(
    <div>
     <p className="mt-3">
        Task: {param.slug.join(" / ")}
      </p>
    </div>
  )
}