/* eslint-disable @next/next/link-passhref */
import { ArrowLeftIcon } from "@chakra-ui/icons"
import { Flex, Image, Link as Anchor } from "@chakra-ui/react"
import Link from 'next/link'

import { HeaderProps } from "../@types"

function Header({ path }: HeaderProps) {
  return (
    <Flex as="header" justify="center" pos="relative" p="1rem" w="100vw">
      {path !== '/' && (
        <Link href="/">
          <Anchor as="a" color="highlight.half" pos="absolute" left="2rem" top="1.5rem">
            <ArrowLeftIcon />
          </Anchor>
        </Link>
      )}
      <Image h={45.92} w={184.06} src="/logo.svg" alt="logo" />
    </Flex>
  )
}

export { Header }
