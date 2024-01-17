import Posts from '../components/Posts';

const Home = () => {
  const Image = ({ src, alt }) => (
    <img className="w-full h-96 object-cover" src={src} alt={alt} />
  );

  const url =
    'https://globalpccs.com/wp-content/uploads/2023/02/blog.jpg';

  return (
    <>
      <Image src={url} alt="post" />
      <div className="flex">
        <div className="ml-[100px] w-5/6 p-4">
          <Posts />
        </div>
      </div>
    </>
  )
}

export default Home;
