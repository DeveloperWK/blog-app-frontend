import user_logo from "@/assets/user_logo.png";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FaBookBookmark, FaHandshakeSimple } from "react-icons/fa6";
import { SiDatefns } from "react-icons/si";
import xyz from "../assets/xyz.webp";
import Flex from "./components/Flex";
import LabelText from "./components/LabelText";
import MutedText from "./components/MutedText";
import Paragraph from "./components/Paragraph";
import Root from "./home_layout/Root";

export default function Home() {
  return (
    <Root>
      <div className="bg-bg w-[90%] mx-auto pt-10 pb-10 px-2 md:pt-16">
        <div className="border border-solid border-border_color rounded-lg p-5">
          <Flex className="bg-card_bg py-5 px-4 gap-x-4 rounded-lg">
            <div className="w-[70%]">
              <Flex>
                <div
                  className={
                    "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                  }
                >
                  <Image src={user_logo} alt={"logo"} />
                </div>
                <LabelText>henry</LabelText>
              </Flex>
              <Paragraph className="mt-4">
                RAG in Action: Build your Own Local PDF Chatbot as a Beginner
              </Paragraph>
              <MutedText className="mt-4">
                Understanding chunking, embeddings and vector search better by
                building a PDF chatbot with LangChain, Ollama and Mistral.
              </MutedText>
            </div>
            <div className="w-[30%]">
              <Image src={xyz} alt="image" className="w-full" />
            </div>
          </Flex>

          <Flex className="mt-4 gap-x-3">
            <Flex className="gap-x-2">
              <SiDatefns className="text-primary text-10" />
              <LabelText>12 April 2013</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaHandshakeSimple className="text-primary text-10" />
              <LabelText>11k</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaRegComment className="text-primary text-10" />
              <LabelText>100</LabelText>
            </Flex>
            <FaBookBookmark className="text-primary text-10" />
            <BsThreeDots className="text-primary text-10" />
          </Flex>
        </div>

        {/* 1 */}

        <div className="border border-solid border-border_color rounded-lg p-5 mt-4">
          <Flex className="bg-card_bg py-5 px-4 gap-x-4 rounded-lg">
            <div className="w-[70%]">
              <Flex>
                <div
                  className={
                    "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                  }
                >
                  <Image src={user_logo} alt={"logo"} />
                </div>
                <LabelText>@henry</LabelText>
              </Flex>
              <Paragraph className="mt-4">
                RAG in Action: Build your Own Local PDF Chatbot as a Beginner
              </Paragraph>
              <MutedText className="mt-4">
                Understanding chunking, embeddings and vector search better by
                building a PDF chatbot with LangChain, Ollama and Mistral.
              </MutedText>
            </div>
            <div className="w-[30%]">
              <Image src={xyz} alt="image" className="w-full" />
            </div>
          </Flex>

          <Flex className="mt-4 gap-x-3">
            <Flex className="gap-x-2">
              <SiDatefns className="text-primary text-10" />
              <LabelText>12 April 2013</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaHandshakeSimple className="text-primary text-10" />
              <LabelText>11k</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaRegComment className="text-primary text-10" />
              <LabelText>100</LabelText>
            </Flex>
            <FaBookBookmark className="text-primary text-10" />
            <BsThreeDots className="text-primary text-10" />
          </Flex>
        </div>

        {/* 2 */}

        <div className="border border-solid border-border_color rounded-lg p-5 mt-4">
          <Flex className="bg-card_bg py-5 px-4 gap-x-4 rounded-lg">
            <div className="w-[70%]">
              <Flex>
                <div
                  className={
                    "w-[32px] h-[32px] rounded-full overflow-hidden border border-solid border-border_color cursor-pointer mr-3"
                  }
                >
                  <Image src={user_logo} alt={"logo"} />
                </div>
                <LabelText>henry</LabelText>
              </Flex>
              <Paragraph className="mt-4">
                RAG in Action: Build your Own Local PDF Chatbot as a Beginner
              </Paragraph>
              <MutedText className="mt-4">
                Understanding chunking, embeddings and vector search better by
                building a PDF chatbot with LangChain, Ollama and Mistral.
              </MutedText>
            </div>
            <div className="w-[30%]">
              <Image src={xyz} alt="image" className="w-full" />
            </div>
          </Flex>

          <Flex className="mt-4 gap-x-3">
            <Flex className="gap-x-2">
              <SiDatefns className="text-primary text-10" />
              <LabelText>12 April 2013</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaHandshakeSimple className="text-primary text-10" />
              <LabelText>11k</LabelText>
            </Flex>
            <Flex className="gap-x-2">
              <FaRegComment className="text-primary text-10" />
              <LabelText>100</LabelText>
            </Flex>
            <FaBookBookmark className="text-primary text-10" />
            <BsThreeDots className="text-primary text-10" />
          </Flex>
        </div>
      </div>
    </Root>
  );
}
