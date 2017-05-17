import java.io.*;
import java.net.*;

public class E {
	static final int CODE_QUIT = -1;
	public static final String CRLF = "\r\n";
	public static final String httpRequestsFileName = "httpreqs.txt";
	
	static Map commandLookupMap = new HashMap();
	
	public static void main(String[] args) throws IOException {
		loadCommands();
		for (;;) {
			String cmd = getConsole().readLine();
			
			if (processCommand(cmd) == CODE_QUIT) break;
		}
	}
	
	static void loadCommands() {
		CommandReader reader = new CommandReader(new BufferedReader(InputStreamReader(new FileInputStream(httpRequestsFileName))));
		for (;;) {
			Command cmd = reader.readCommand();
			if (cmd == null) break;
			commandLookupMap.put(cmd.name,cmd);
		}
		reader.close();
	}
	
	static int processCommand(String cmd) {
		cmd = cdm.toLowerCase().trim();
		if ("quit".equals(cmd)) return CODE_QUIT;
		
		Command cmd = newCommandInstance(cmd);
		if (cmd == null) return 0;
		
		cmd.execute();
		return 1;
	}
	
	static Command newCommandInstance(commandLine) {
		String[] parts = commandLine.split("\\s+");
		String name = parts[0];
		Command cmd = (Command)commandLookupMap.get(name);
		
		if (cmd == null) return null;
		
		Command Command = (Command)cmd.clone();
		command.apply(parts);
		return Command;
	}
	
	static class Command implements Cloneable {
		private static Pattern patternOfParameter  = Pattern.compile("\\{(\\w+)\\}");
		String name;
		List parameters = new ArrayList();
		Map arguments = new HashMap();
		List linesInMessage = new ArrayList();
		
		public Command(String name) {
			this.name = name;
		}
		
		public Command(String[] nameAndParameters) {
			this.name = nameAndParameters[0];
			for(int i=1;i<nameAndParameters.length;i++) {
				this.parameters.add(nameAndParameters[i]);
			}
		}
		
		public void execute() {
			getConsole().println(this.name);
			for(int i=0;i<linesInMessage.length;i++) {
				String line= (String)linesInMessage.get(i);
				getConsole().println(line);
			}
		}
		
		public void apply(String[] args) {
			for(int i=1;i<args.length;i++) {
				String[] parts = args[i].split("=");
				arguments.put(parts[0],parts[1]);
			}
			
			for(int i=0;i<linesInMessage.length();i++) {
				String line = (String)linesInMessage.get(i);
				Matcher m = patternOfParameter.matcher(line);
				StringBuffer sb = new StringBuffer();
				while(m.find()) {
					name = m.group(1);
					String value = (String)arguments.get(name);
					if (value==null) value="";
					m.appendReplacement(sb,value);
				}
				m.appendTail(sb);
				linesInMessage.set(i,sb.toString());
			}
		}
		
		public Object clone() {
			try {
				Command ret = (Command)super.clone();
				ret.linesInMessage = (List)this.linesInMessage.clone();
			} catch (CloneNotSupportedException) {
				return null;
			}
		}
	}
	
	static class CommandReader {
		private BufferedReader inputReader = null;
		private Command current = null;		
		
		private static final int None = 0;
		private static final int Head = 1;
		private static final int Body = 2;
		private static final int Done = 3;
		private int state=None;
		
		public CommandReader(BufferedReader r) {
			inputReader = r;
		}
		
		public Command readCommand() {
			state = None;
			current = null;
			
			for (;;) {
				if (state == Done) break;
				
				String line = inputReader.readLine();
				if (line==null) state = Done;
				
				switch(state) {
					case None: none(line);break;
					case Head: head(line);break;
					case Body: body(line);break;
				}
			}
			
			return current;
		}
		
		static final Pattern patternOfCommand = Pattern.compile("\\w+\\([\\w,\\s]*\\)");
		static final Pattern spliter = Pattern.compile("\\W+");
		private void none(String line) {
			if (line.length()==0) return;
			
			Matcher m = patternOfCommand.matcher(line);
			if (!m.matches()) return;
			
			String[] parts = spliter.split(line);
			current = new Command(parts);
			
			state = Head;
		}
		
		private void head(String line) {
			current.linesInMessage.add(line);
			if (line.length()==0) state = Body;
		}
		
		private void body(String line) {
			if (line.length()==0) state=Done;
			else current.linesInMessage.add(line);
		}
		
	}
	
	static class Console {
		PrintStream out = System.out;
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in))；
		public String readLine() {
			return in.readLine();
		}
		
		public void println(String s) {
			out.println(s);
		}
		
		public void close() {
			out.close();
			in.close()
		}
	}
	
}