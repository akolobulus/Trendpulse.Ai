import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Instagram, Mail, ExternalLink } from "lucide-react";

export default function About() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/akolo-bulus",
      icon: Linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Professional network and career updates"
    },
    {
      name: "Twitter",
      url: "https://x.com/BulusAkolo",
      icon: Twitter,
      color: "bg-black hover:bg-gray-800",
      description: "Tech insights and daily thoughts"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/heisakolo",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      description: "Behind the scenes and personal moments"
    },
    {
      name: "GitHub",
      url: "https://github.com/akolobulus",
      icon: Github,
      color: "bg-gray-800 hover:bg-gray-900",
      description: "Open source projects and code repositories"
    }
  ];

  const skills = [
    "Full Stack Development",
    "React & Node.js",
    "AI/ML Integration",
    "Database Design",
    "Cloud Deployment",
    "API Development",
    "UI/UX Design",
    "Data Analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              AB
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Akolo Bulus
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Full Stack Developer & AI Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>About the Developer</span>
            </CardTitle>
            <CardDescription>
              Passionate about creating innovative solutions that make a difference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to TrendPulse.AI! I'm Akolo Bulus, a passionate full-stack developer with a keen interest in 
              artificial intelligence and market analytics. I created this platform to provide comprehensive market 
              intelligence specifically tailored for the Nigerian market.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              With expertise in React, Node.js, and AI integration, I focus on building scalable applications that 
              deliver real value to users. TrendPulse.AI combines cutting-edge AI technology with intuitive design 
              to help businesses make data-driven decisions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing insights about the latest trends in tech and entrepreneurship.
            </p>
          </CardContent>
        </Card>

        {/* Project Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About TrendPulse.AI</CardTitle>
            <CardDescription>
              AI-powered market intelligence for the Nigerian market
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Real-time trend analysis</li>
                  <li>• Sentiment monitoring</li>
                  <li>• Viral prediction algorithms</li>
                  <li>• Regional market insights</li>
                  <li>• Nigerian Pidgin analysis</li>
                  <li>• Content strategy recommendations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Technology Stack</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• React with TypeScript</li>
                  <li>• Node.js & Express API</li>
                  <li>• Google Gemini AI</li>
                  <li>• PostgreSQL Database</li>
                  <li>• Tailwind CSS</li>
                  <li>• Deployed on Render & Vercel</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links Section */}
        <Card>
          <CardHeader>
            <CardTitle>Connect With Me</CardTitle>
            <CardDescription>
              Let's connect and collaborate on exciting projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.name}
                    variant="outline"
                    className={`p-6 h-auto flex-col gap-3 group hover:scale-105 transition-all duration-200 ${link.color} hover:text-white border-2`}
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <Icon className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold flex items-center gap-1">
                        {link.name}
                        <ExternalLink className="h-3 w-3" />
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {link.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Have a project in mind? Let's work together!
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => window.open('mailto:contact@akolobulus.com', '_blank')}
              >
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            © 2025 Akolo Bulus. Built with passion using React & AI.
          </p>
        </div>
      </div>
    </div>
  );
}