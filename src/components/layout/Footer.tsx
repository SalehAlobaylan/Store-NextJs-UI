export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Tailwind CSS, and TypeScript as a frontend template.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Store</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
