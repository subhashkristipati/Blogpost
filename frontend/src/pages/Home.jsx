// import Banner from '../banner/Banner';
// import Categories from './Categories';
import Posts from '../components/Posts';

const Home = () => {
  const Image = ({ src, alt }) => (
    <img className="w-full h-96 object-cover" src={src} alt={alt} />
  );

  const url =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

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
