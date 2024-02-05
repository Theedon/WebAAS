/**
 * Codegen configuration for generating TypeScript types and React query components
 * from the GraphQL schema and operations.
 *
 * Imports the CodegenConfig from @graphql-codegen/cli to initialize the configuration.
 *
 * Defines:
 * - Schema location
 * - Documents (operations) to include
 * - Generated outputs:
 *   - Type definition file
 *   - Generated React query components
 * - Codegen plugins to use
 * - Configs for the plugins
 */
import { CodegenConfig } from "@graphql-codegen/cli";

const client: CodegenConfig = {
  //initialize client for codegen config

  overwrite: true, // overwrite files
  schema: "http://localhost:3000/api/graphql", //file schema
  documents: ["src/app/**/!(*.generated).{ts,tsx}", "src/components/**/!(*.generated).{ts,tsx}"], //directories to check
  generates: {
    "src/app/types.ts": {
      plugins: ["typescript"], //generate the types to types.ts with the graphql types
      config: {
        avoidOptionals: {
          field: "true",
          inputValue: "false",
          object: "false",
          defaultValue: "false",
        },
      }, // configs
    },
    "src/app": {
      preset: "near-operation-file", //preset to create files in the operation file directory
      presetConfig: {
        extension: ".generated.tsx", //extension of generated files
        baseTypesPath: "types.ts", //where to find the type file
        folder: "./__generated__", //folder to keep the generated files in
      },
      config: {
        fetcher: "fetch",
        avoidOptionals: {
          field: "true",
          inputValue: "false",
          object: "false",
          defaultValue: "false",
        },
      }, // configs
      plugins: ["typescript-operations"], //plugin for generating typescript types for queries
    },
    // hooks: {
    //   afterAllFileWrite: "prettier --write",
    // },
  },
};

export default client;
