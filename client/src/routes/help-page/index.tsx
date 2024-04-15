import { CreatorForm } from "@components/creator-form";

export function HelpPage() {
    return (
        <div className="about-page" style={{
            color: '#2B3EFF', 
            fontFamily: 'cursive', 
            fontSize: '20px',
            padding: '20px' 
        }}>
            <img 
                src='https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/me4xyuzwwtvktzitvlvw.jpg' 
                style={{
                    borderRadius: '15px', 
                    maxWidth: '45%', 
                    height: 'auto', 
                    display: 'block', 
                    margin: '0 auto 20px' 
                }}
                alt="Feature Visual"
            />
            <h1>About Crowdfunding on Our Platform</h1>
            <p>
                Our platform empowers individuals and organizations to initiate crowdfunding campaigns for various causes, including military aid, disaster relief, medical developments, and open source projects. By pooling resources from a global community, we facilitate the necessary funding and support to tackle urgent and impactful challenges.
            </p>
            <h2>What is Crowdfunding?</h2>
            <p>
                Crowdfunding is a collective effort of individuals who network and pool their resources, usually via the internet, to support efforts initiated by people or organizations. It allows startups, nonprofits, and individuals to gather funds for their projects from a wide range of donors, thus democratizing the funding process.
            </p>
            <p>
                We specialize in several types of crowdfunding, including rewards-based, equity-based, donation-based, and debt-based, to cater to different project needs and backer preferences.
            </p>
            <h2>Types of Projects We Support</h2>
            <ul>
                <li><strong>Military Aid:</strong> Support for veterans, active duty personnel, and their families, including resources for rehabilitation and reintegration into society.</li>
                <li><strong>Disaster Relief:</strong> Immediate and ongoing support for communities affected by natural and man-made disasters.</li>
                <li><strong>Medical Development:</strong> Funding for medical research, healthcare facilities, and public health initiatives.</li>
                <li><strong>Open Source Projects:</strong> Investments in the development of open source software that promotes innovation and community collaboration.</li>
                <li><strong>Technology and Innovation:</strong> We encourage the development of cutting-edge technological solutions and innovative ideas that can transform industries and societies.</li>
                <li><strong>Environment and Conservation:</strong> Focus on environmental protection, promoting sustainable practices and conservation efforts to safeguard our planet.</li>
                <li><strong>Arts and Culture:</strong> Support arts and cultural projects that enrich communities and preserve cultural heritage.</li>
            </ul>
            <h2>How to Start Your Crowdfunding Campaign</h2>
            <p>
                Launching a crowdfunding campaign on our platform involves several key steps:
            </p>
            <ul>
                <li><strong>Research:</strong> Understand the landscape and set a clear, achievable goal that communicates your project's importance and impact.</li>
                <li><strong>Prepare Your Campaign:</strong> Develop compelling content that resonates with potential backers. Use stories, videos, and impactful imagery to convey the urgency and necessity of your cause.</li>
                <li><strong>Promote Your Campaign:</strong> Leverage social media, community engagement, and strategic partnerships to maximize exposure and support for your campaign.</li>
            </ul>
            <h3>Join Our Community</h3>
            <p>
                By joining our platform, you’re not just launching a campaign; you’re building a community ready to support and promote your cause. Register now to start making a difference in areas that matter the most.
            </p>
            <h3>Ready to Change the World?</h3>
            <p>
                Whether you are fighting for peace, rebuilding after a disaster, advancing health solutions, or developing open source software, our platform is your starting point. Register now and turn your vision into action.
            </p>
            <CreatorForm />
        </div>
    );
}