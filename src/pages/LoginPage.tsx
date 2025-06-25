import Login from '../components/common/Login';

function LoginPage() {
    return (
        <div className="relative h-screen w-screen">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.squarespace-cdn.com/content/v1/65ab1c1e44d969650c9801c4/5e216f1c-6a65-432b-9087-d1a9fca2c0b9/animation_file.gif')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8,
                }}
            />

            <div className="absolute inset-0 z-0 backdrop-blur-sm bg-black/20" />

            <div className="relative z-10 flex justify-center items-center h-full">
                <div className="shadow-xl">
                    <Login />
                </div>
            </div>
        </div>
    );
}


export default LoginPage;
